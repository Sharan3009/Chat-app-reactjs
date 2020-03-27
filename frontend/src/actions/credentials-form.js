export const AFTER_SUBMIT = "AFTER_SUBMIT";
export const FORM_HANDLER = "FORM_HANDLER";

export function setFormData(name,value){
    return function(dispatch){
        let action = {
            type:FORM_HANDLER,
            payload:{name,value}
        }
        dispatch(action);
        return Promise.resolve();
    }
}

export function afterFormSubmit(show,message,variant){
    return{
        type: AFTER_SUBMIT,
        payload:{
            show,
            message,
            variant
        }
    }
}