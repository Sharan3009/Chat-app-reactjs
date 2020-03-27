export const FORM_VALID = "FORM_VALID";
export const AFTER_SUBMIT = "AFTER_SUBMIT";
export const FORM_HANDLER = "FORM_HANDLER";
export const FORM_FIELD_ERROR_HANDLER = "FORM_FIELD_ERROR_HANDLER";
export const FORM_FIELD_TOUCHED_HANDLER = "FORM_FIELD_TOUCHED_HANDLER";

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

export function setFormValid(bool){
    return {
        type:FORM_VALID,
        payload:bool
    };
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

export function setFormFieldErrors(data){
    return function(dispatch){
        let action = {
            type:FORM_FIELD_ERROR_HANDLER,
            payload:data
        }
        dispatch(action);
        return Promise.resolve();
    }
}

export function setFormFieldTouched(data){
    return function(dispatch){
        let action = {
            type:FORM_FIELD_TOUCHED_HANDLER,
            payload:data
        }
        dispatch(action);
        return Promise.resolve();
    }
}