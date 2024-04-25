const getParentElement = (element, formGroup) => {
    let parentElement
    while (element.parentElement) {
        if (element.parentElement.matches(formGroup)) {
            parentElement = element.parentElement
            break
        }
        element = element.parentElement
    }
    return parentElement
}

export default getParentElement;