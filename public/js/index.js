import '@babel/polyfill';
import { postOrGet, deleteNote } from './postOrGet';

const submit = document.querySelector('.submit_text');
const form = document.querySelector('.form_note');
const form_get = document.querySelector('.form_get');
const get_notes = document.querySelector('.get_items');
const greeting = document.getElementById('greeting');
const contents = document.querySelector('.contents');
const created = document.querySelector('.created');


if(form){
    form.addEventListener('submit',async (e)=> {
        //e. stopImmediatePropagation(); 
        e.preventDefault(true);
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const item = document.getElementById('todoitem').value;
        
        submit.value= "Saving";
        await postOrGet({name, email,item}, 'posting');
        location.reload();
        submit.value= "Submit";
    
    });
}


if(form_get){
    form_get.addEventListener('submit',async (e)=> {
        e.preventDefault();

        const email = document.getElementById('get_email').value;

        if(!email){
            alert('Please enter a value in the email field');
        }else{
   
            const n = await postOrGet({ email }, 'get_data');
            
            if(n.length === 0){
                alert('You do not have any Notes saved.');
                //location.assign('/');
            }else{
            
                const greet = `<p class="button">Hi ${n.data[0].name.split(' ')[0]} here are your saved notes: </p>`;
                const create_notes = '<p class="button">Uh oh! You do not have anything, please create some notes.</p>';
                greeting.innerHTML = greet ;
                
                let counter = n.length;
                let slno = 1;
                
                let item = `<div id="div_${slno}" class="timestamp">
                            [${new Date(n.data[0].createdAt).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}]:👉 
                            <span>${n.data[0].item}</span><br>
                            <input id="update_${slno}" class="button_note" type="button" value = "update"> | 
                            <input id="delete_${slno}" class="button_note" type="button" value = "delete"><hr></div>`;
                
                for(let i = 1; i < n.length; i++){

                    slno += 1;
                    item = item + `<div id="div_${slno}" class="timestamp">
                                    [${new Date(n.data[i].createdAt).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}]:👉 
                                    <span>${n.data[i].item}</span><br>
                                    <input id="update_${slno}" class="button_note" type="button" value = "update"> | 
                                    <input id="delete_${slno}" class="button_note" type="button" value = "delete"><hr></div>`;
                }
                
                contents.innerHTML = item;
                
                for(let i = 0; i< slno; i++){

                    document.getElementById(`delete_${i+1}`).addEventListener("click", function(){

                        document.getElementById(`div_${i+1}`).style.display = 'none';
                        deleteNote(n.data[i].id);

                        counter-=1;
                        if(counter === 0){
                            greeting.innerHTML = create_notes ;
                        }
                    });

                    document.getElementById(`update_${i+1}`).addEventListener("click", function(){
                        alert('Updation is not available yet, It will be implemented soon!')
                    });
                }
    }
}

    });
}





