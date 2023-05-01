export function listingsData(listing, index) {
    const createRowData = rowIndex => {
        const item = listing[index].item;
        const units = listing[index].units;
        const price = listing[index].price;
        const description= listing[index].description;
        const category = listing[index].category;

        return {
            item, 
            units, 
            price, 
            description,
            category
        }
    }    

    return Array.from({ length }).map((_, index) => {
        return createRowData(index);
    });

}