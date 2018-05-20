export default function() {

    let data = {};

    return {

        get(name){
            return Promise.resolve(data[name]);
        },

        set(name, setData){
            data[name] = setData;
            return Promise.resolve(setData);
        }
    }
};
