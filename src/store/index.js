import { configureStore } from "@reduxjs/toolkit";

import adminReducer from './admin.slice'
import categoryReducer from './category.slice'
import subCategoryReducer from './subcategory.slice'
import productReducer from './product.slice'

const store = configureStore({
    reducer: {
        admin: adminReducer,
        category: categoryReducer,
        subcategory: subCategoryReducer,
        product: productReducer
    }
})

export default store;