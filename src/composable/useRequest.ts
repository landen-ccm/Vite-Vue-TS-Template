import { computed, type DeepReadonly, readonly, ref, type Ref } from 'vue'
import { type AxiosResponse, isAxiosError } from 'axios'

/**
 * @param requestFn async function that returns the data
 * @param pageName name of the page, used for error logging
 * @param notifyMessage optional object with success and failure messages to be shown in the notification
 *
 * @returns invoke function that calls the requestFn and handles the loading and error states
 * @returns data the data returned from the requestFn
 * @returns status the status of the request (initial, loading, error, success)
 * @returns code the status code of the response
 * @returns errorMessages the error messages from the response
 * @returns computed booleans for each status
 */

type Status = 'initial' | 'loading' | 'error' | 'success'

export const useRequest = <Params extends readonly unknown[], ResultType>(
  requestFn: (...args: Params) => Promise<Partial<AxiosResponse<ResultType>> | void>
): {
  invoke: (...args: Parameters<typeof requestFn>) => Promise<ResultType | undefined>
  data: Ref<ResultType | null>
  status: DeepReadonly<Ref<Status>>
  code: DeepReadonly<Ref<number | null>>
  errorMessages: DeepReadonly<Ref<string[]>>
  isInitial: DeepReadonly<Ref<boolean>>
  isLoading: DeepReadonly<Ref<boolean>>
  isError: DeepReadonly<Ref<boolean>>
  isSuccess: DeepReadonly<Ref<boolean>>
} => {
  const status: Ref<Status> = ref('initial')
  const code: Ref<number | null> = ref(null)
  const errorMessages = ref<string[]>([])
  const data: Ref<ResultType | null> = ref(null)

  const invoke = async (...args: Parameters<typeof requestFn>) => {
    status.value = 'loading'
    errorMessages.value = []

    try {
      const response = (await requestFn(...(args as any))) as AxiosResponse<ResultType>

      // success && notify.success(success)

      data.value = response?.data ?? null
      code.value = response?.status ?? null
      status.value = 'success'

      return response
    } catch (err: any) {
      status.value = 'error'

      if (isAxiosError(err)) code.value = err?.response?.status ?? null

      if (err?.response?.data?.errors) errorMessages.value = err.response.data.errors

      return err?.response ?? err
    }
  }

  const statusEquals = (statusToCheck: Status) => status.value === statusToCheck

  return {
    invoke,
    data,
    status: readonly(status),
    code: readonly(code),
    errorMessages: readonly(errorMessages),
    // Derived from status
    isInitial: computed(() => statusEquals('initial')),
    isLoading: computed(() => statusEquals('loading')),
    isError: computed(() => statusEquals('error')),
    isSuccess: computed(() => statusEquals('success'))
  }
}
