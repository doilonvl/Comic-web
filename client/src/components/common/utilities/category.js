const category = (categories, story) => {
    if (!story.categoryId || !Array.isArray(story.categoryId)) {
        return "";
    }

    const categoryNames = story.categoryId.map(storyCatId => {
        const categoryObj = categories.find(cat => cat.id === storyCatId);
        return categoryObj ? categoryObj.name : '';
    }).filter(name => name);

    return categoryNames.join(", ");
}

export default category;
