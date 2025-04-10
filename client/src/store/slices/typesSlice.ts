import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import axios from "axios";
import TypesService from "../../api/services/TypesService";
import { Type } from "../../api/models/Type";

export interface ITypesSliceState {
	items: Type[];
	selectedType: Type;
	loading: boolean;
	error: string | null | undefined;
}

const initialState: ITypesSliceState = {
	items: [],
	selectedType: { id: 0, name: "" },
	loading: false,
	error: null,
};

const createAppSlice = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator },
});

const typesSlice = createAppSlice({
	name: "types",
	initialState,
	reducers: (create) => ({
		getAllTypes: create.asyncThunk(
			async () => {
				try {
					const response = await TypesService.getTypes();
					return response.data;
				} catch (error) {
					if (axios.isAxiosError(error)) {
						return Promise.reject(error.response?.data.message);
					} else {
						console.log(error);
					}
				}
			},
			{
				pending: (state) => {
					state.loading = true;
					state.error = null;
				},
				rejected: (state, action) => {
					state.loading = false;
					state.error = action.error.message;
				},
				fulfilled: (state, action) => {
					state.loading = false;
					if (action.payload) state.items = action.payload;
				},
			}
		),
		setSelectedType: create.reducer((state, action: { payload: Type }) => {
			state.selectedType = action.payload;
		}),
	}),
});
export const { getAllTypes, setSelectedType } = typesSlice.actions;
export default typesSlice.reducer;
