export const updateObject = (oldObject, updatedProporties) => {
    // update the old state with new proporties
    return{
        ...oldObject,
        ...updatedProporties
    }
}