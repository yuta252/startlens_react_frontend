import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from "axios";

import { RootState } from '../../../app/store';
import {
    EXHIBIT_STATE,
    EXHIBIT_PAGINATE_INDEX,
    MULTI_EXHIBIT,
    POST_EXHIBIT,
    POST_PICTURE,
    READ_EXHIBIT,
    READ_PICTURE,
} from "../../types";


export const fetchAsyncGetExhibits = createAsyncThunk(
    "exhibit/getExhibits",
    async (page: number) => {
        const res = await axios.get<EXHIBIT_PAGINATE_INDEX>(
            `${process.env.REACT_APP_API_URL}/api/v1/exhibits?page=${page}`,
            {
                headers: {
                    Authorization: `${localStorage.localJWT}`,
                },
            }
        );
        return res.data;
    }
);

export const fetchAsyncCreateExhibit = createAsyncThunk(
    "exhibit/createExhibits",
    async (exhibit: POST_EXHIBIT) => {
        const res = await axios.post<READ_EXHIBIT>(
            `${process.env.REACT_APP_API_URL}/api/v1/exhibits`,
            { "exhibit": exhibit },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.localJWT}`,
                },
            }
        );
        return res.data
    }
);

export const fetchAsyncUpdatePicture = createAsyncThunk(
    "exhibit/updateExhibit",
    async (pictures: POST_PICTURE) => {
        // remove exhibitId property
        const {exhibitId, ...postPictures} = pictures
        const res = await axios.patch<READ_EXHIBIT>(
            `${process.env.REACT_APP_API_URL}/api/v1/exhibits/${pictures.exhibitId}`,
            { "exhibit": postPictures },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.localJWT}`,
                },
            }
        );
        return res.data
    }
);

export const fetchAsyncDeleteExhibit = createAsyncThunk(
    "exhibit/deleteExhibit",
    async (id: number) => {
        await axios.delete(
            `${process.env.REACT_APP_API_URL}/api/v1/exhibits/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.localJWT}`,
                },
            },
        );
        return id;
    }
);

export const fetchAsyncCreateMultiExhibit = createAsyncThunk(
    "exhibit/createMultiExhibit",
    async (exhibit: MULTI_EXHIBIT) => {
        const {id, ...postExhibit} = exhibit
        const res = await axios.post<MULTI_EXHIBIT>(
            `${process.env.REACT_APP_API_URL}/api/v1/multi_exhibits`,
            { "multi_exhibit": postExhibit },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.localJWT}`,
                },
            }
        );
        return res.data
    }
);

export const fetchAsyncUpdateMultiExhibit = createAsyncThunk(
    "exhibit/updateMultiExhibit",
    async (exhibit: MULTI_EXHIBIT) => {
        const res = await axios.patch<MULTI_EXHIBIT>(
            `${process.env.REACT_APP_API_URL}/api/v1/multi_exhibits/${exhibit.id}`,
            { "multi_exhibit": exhibit },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.localJWT}`,
                },
            }
        );
        return res.data
    }
);

export const fetchAsyncDeleteMultiExhibit = createAsyncThunk(
    "exhibit/deleteMultiExhibit",
    async (exhibit: MULTI_EXHIBIT) => {
        await axios.delete(
            `${process.env.REACT_APP_API_URL}/api/v1/multi_exhibits/${exhibit.id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.localJWT}`,
                },
            },
        );
        return exhibit;
    }
);

export const initialState: EXHIBIT_STATE = {
    error: {
        isError: false,
        message: ""
    },
    exhibits: [
        {
            id: 0,
            pictures: [
                {
                    id: 0,
                    url: ""
                }
            ],
            multiExhibits: [
                {
                    id: 0,
                    exhibitId: 0,
                    lang: "",
                    name: "",
                    description: ""
                }
            ]
        },
    ],
    params: {
        last: 1
    },
    isDisplayed: true,
    editedPicture: {
        id: 0,
        pictures: [
            {
                id: 0,
                url: ""
            }
        ],
    },
    editedMultiExhibit: {
        id: 0,
        exhibitId: 0,
        lang: "",
        name: "",
        description: ""
    },
    selectPicture: {
        id: 0,
        pictures: [
            {
                id: 0,
                url: ""
            }
        ],
    },
    selectMultiExhibit: [
        {
            id: 0,
            exhibitId: 0,
            lang: "",
            name: "",
            description: ""
        }
    ]
};

export const exhibitSlice = createSlice({
    name: 'exhibit',
    initialState,
    reducers: {
        changeDisplay(state, action: PayloadAction<boolean>) {
            state.isDisplayed = action.payload;
        },
        editPicture(state, action: PayloadAction<READ_PICTURE>) {
            state.editedPicture = action.payload;
        },
        selectPicture(state, action: PayloadAction<READ_PICTURE>) {
            state.selectPicture = action.payload;
        },
        editMultiExhibit(state, action: PayloadAction<MULTI_EXHIBIT>) {
            state.editedMultiExhibit = action.payload;
        },
        selectMultiExhibit(state, action: PayloadAction<MULTI_EXHIBIT[]>) {
            state.selectMultiExhibit = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchAsyncGetExhibits.fulfilled,
            (state, action: PayloadAction<EXHIBIT_PAGINATE_INDEX>) => {
                const data: READ_EXHIBIT[] = action.payload.data;
                const meta = action.payload.meta;
                return {
                    ...state,
                    exhibits: data,
                    params: meta.params
                };
            }
        );
        builder.addCase(
            fetchAsyncCreateExhibit.fulfilled,
            (state, action: PayloadAction<READ_EXHIBIT>) => {
                return {
                    ...state,
                    exhibits: [action.payload, ...state.exhibits]
                }
            }
        );
        builder.addCase(
            fetchAsyncUpdatePicture.fulfilled,
            (state, action: PayloadAction<READ_EXHIBIT>) => {
                // update selectPicture state because move back to detail page after completing to edit
                return {
                    ...state,
                    exhibits: state.exhibits.map( (exhibit) =>
                        exhibit.id === action.payload.id ? action.payload : exhibit
                    ),
                    selectPicture: {id: action.payload.id, pictures: action.payload.pictures}
                }
            }
        );
        builder.addCase(
            fetchAsyncDeleteExhibit.fulfilled,
            (state, action: PayloadAction<number>) => {
                return {
                    ...state,
                    exhibits: state.exhibits.filter( (exhibit) =>
                        exhibit.id !== action.payload
                    ),
                }
            }
        );
        builder.addCase(
            fetchAsyncCreateMultiExhibit.fulfilled,
            (state, action: PayloadAction<MULTI_EXHIBIT>) => {
                return {
                    ...state,
                    exhibits: state.exhibits.map( (exhibit: READ_EXHIBIT) =>
                        exhibit.id !== action.payload.exhibitId ?  exhibit :
                        ({...exhibit, multiExhibits: [action.payload, ...exhibit.multiExhibits]})
                    ),
                    selectMultiExhibit: [...state.selectMultiExhibit, action.payload]
                }
            }
        );
        builder.addCase(
            fetchAsyncUpdateMultiExhibit.fulfilled,
            (state, action: PayloadAction<MULTI_EXHIBIT>) => {
                return {
                    ...state,
                    exhibits: state.exhibits.map( (exhibit: READ_EXHIBIT) =>
                        exhibit.id !== action.payload.exhibitId ?  exhibit :
                        ({...exhibit, multiExhibits: exhibit.multiExhibits.map( (multiExhibit) =>
                                multiExhibit.id === action.payload.id ? action.payload : multiExhibit
                            )
                        })
                    ),
                    selectMultiExhibit: state.selectMultiExhibit.map( (multiExhibit) =>
                        multiExhibit.id !== action.payload.id ? multiExhibit : action.payload
                    )
                }
            }
        );
        builder.addCase(
            fetchAsyncDeleteMultiExhibit.fulfilled,
            (state, action: PayloadAction<MULTI_EXHIBIT>) => {
                return {
                    ...state,
                    exhibits: state.exhibits.map( (exhibit: READ_EXHIBIT) =>
                        exhibit.id !== action.payload.exhibitId ?  exhibit :
                        ({...exhibit, multiExhibits: exhibit.multiExhibits.filter( (multiExhibit) =>
                                multiExhibit.id !== action.payload.id
                            )
                        })
                    ),
                    selectMultiExhibit: state.selectMultiExhibit.filter( (multiExhibit) =>
                        multiExhibit.id !== action.payload.id
                    )
                }
            }
        );
    },
});

export const { editPicture, selectPicture, editMultiExhibit, selectMultiExhibit, changeDisplay } = exhibitSlice.actions;

export const selectError = (state: RootState) => state.exhibit.error;
export const selectExhibits = (state: RootState) => state.exhibit.exhibits;
export const selectParams = (state: RootState) => state.exhibit.params;
export const selectIsDisplayed = (state: RootState) => state.exhibit.isDisplayed;
export const selectEditedPicture = (state: RootState) => state.exhibit.editedPicture;
export const selectEditedMultiExhibit = (state: RootState) => state.exhibit.editedMultiExhibit;
export const selectSelectedPicture = (state: RootState) => state.exhibit.selectPicture;
export const selectSelectedMultiExhibit = (state: RootState) => state.exhibit.selectMultiExhibit;

export default exhibitSlice.reducer;