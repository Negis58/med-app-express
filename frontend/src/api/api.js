import api from './axios';

export const addRowTable = async (value, subjectId) => {
    try {
        const postObj = {
            ...value, r1022: subjectId
        }
        const {data} = await api.post('/supplier', postObj);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const fetchSupplier = async (subjectId) => {
    try {
        if (subjectId !== undefined) {
            const {data} = await api.get(`/supplier/${subjectId}`);
            return data;
        }
    } catch (e) {
        console.log(e);
    }
}

export const deleteRow = async (id) => {
    try {
        await api.delete(`/supplier/${id}`);
    } catch (e) {
        console.log(e);
    }
}

export const updateRow = async (id, value) => {
    try {
        await api.put(`/supplier/${id}`, value);
    } catch (e) {
        console.log(e);
    }
}

export const fetchSubjects = async () => {
    try {
        const { data } = await api.get('/subjects');
        return data;
    } catch (e) {
        console.log(e)
    }

}