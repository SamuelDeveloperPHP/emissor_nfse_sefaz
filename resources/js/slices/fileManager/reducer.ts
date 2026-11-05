import { createSlice } from "@reduxjs/toolkit";

export const initialState: any = {
  folders: [],
  files: [],
  error: {},
};

const FileManagerSlice: any = createSlice({
  name: 'FileManagerSlice',
  initialState,
  reducers: {
    getFolders: (state: any, action: any) => {
      state.folders = action.payload;
    },

    getFiles: (state: any, action: any) => {
      state.files = action.payload;
    },

    addNewFolder: (state: any, action: any) => {
      state.folders.push(action.payload);
    },

    addNewFile: (state: any, action: any) => {
      state.files.push(action.payload);
    },

    deleteFolder: (state: any, action: any) => {
      state.folders = state.folders.filter(
        (folder: any) => (folder.id + "") !== (action.payload + "")
      );
    },

    deleteFile: (state: any, action: any) => {
      state.files = state.files.filter(
        (file: any) => (file.id + "") !== (action.payload + "")
      );
    },

    updateFolder: (state: any, action: any) => {
      state.folders = state.folders.map((folder: any) =>
        folder.id.toString() === action.payload.id.toString()
          ? { ...folder, ...action.payload }
          : folder
      );
    },


    updateFile: (state: any, action: any) => {
      state.files = state.files.map((files: any) =>
        files.id.toString() === action.payload.id.toString()
          ? { ...files, ...action.payload }
          : files
      );
    },
  }
});
export const { getFolders, getFiles, addNewFolder, addNewFile, deleteFolder, deleteFile, updateFolder, updateFile } = FileManagerSlice.actions;
export default FileManagerSlice.reducer;




