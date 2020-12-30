import '@babel/polyfill';
import { updateNote } from '../../controllers/noteController';
import { update } from '../../models/noteModel';
import { postOrGet, deleteNote, updateNoteAxios  } from './postOrGet';

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
                let slno = 0;
             
                let item = '';
                for(let i = 0 ; i < n.length; i++){
                    slno += 1;
                    item = item + `<div id="div_${slno}" class="timestamp">
                                    <span id="timestamp_${slno}">SAVED AT: [${new Date(n.data[i].createdAt).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}]:👉</span>
                                    <textarea  id="textarea_${slno}" rows="8" cols="80">${n.data[i].item}</textarea><br>
                                    <input id="update_${slno}" class="button_note" type="button" value = "update"> | 
                                    <input id="delete_${slno}" class="button_note" type="button" value = "delete"><hr></div>`
                                    // <span id = "span_${slno}">${n.data[i].item}</span><br>
                                    // <input id="update_${slno}" class="button_note" type="button" value = "update"> | 
                                    // <input id="delete_${slno}" class="button_note" type="button" value = "delete"><hr></div>`;
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

                    document.getElementById(`update_${i+1}`).addEventListener("click", async function(){
                        const item = document.getElementById(`textarea_${i+1}`).value;
                        await updateNoteAxios({ id: n.data[i].id, item  })
                        document.getElementById(`timestamp_${i+1}`).textContent = `SAVED AT:[${new Date(Date.now() - 1000).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}]:👉`;
                         
                    });  
                }
               
    }
}

    });
}





