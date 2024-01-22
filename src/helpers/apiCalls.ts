import axios from 'axios';

export const searchByName = async (name: string) => {
    try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (data.name) {
            alert('success!')
        }
        console.log(data);
    } catch (error) {
        alert('No pokemon found with that name! Try again')
        throw error
    }

}