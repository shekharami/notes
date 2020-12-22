import axios from "axios";



export const postOrGet = async (data, type) => {

    //console.log(data)
    let url;

    try{
        type === 'posting'? url = '/api/notes/save' : url = '/api/notes/get';

        const res = await axios({  
            method: 'POST',
            url,
            data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        });

        

        if(res.data.status === 'success' && type ==='posting'){
            alert("Saved your item successfully.");
        }
        if(type ==='get_data'){
            return res.data.data ;
        }
        

    }catch(err){
        alert(err);
    }
};

export const deleteNote = async (id) => {
    try{
        const res = await axios({  
            method: 'DELETE',
            url: `/api/notes/delete/${id}`,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        });
        if(res.status ===204){
            alert("deleted note successfully.");
        }

    }catch(err){
        alert(err);
    }
};
