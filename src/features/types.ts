/* Common types */
export interface ERROR {
    isError: boolean;
    message: string;
}

/* authSlice.ts */

export interface CRED {
    email: string;
    password: string;
}

export interface USER {
    id: number;
    email: string;
}

export interface JWT {
    token: string;
    email: string;
}

export interface LOGIN_USER {
    id: number;
    email: string;
}

export interface AUTH_STATE {
    error: ERROR;
    isLoginView: boolean;
    isSignedIn: boolean;
    isLoading: boolean;
    loginUser: LOGIN_USER;
}



/* Unused */



export interface FILE extends Blob {
    readonly lastModified: number;
    readonly name: string;
}

export interface PROFILE {
    id: number;
    user_profile: number;
    img: string | null;
}

export interface POST_PROFILE {
    id: number;
    img: File | null;
}









/* taskSlice.ts */
export interface READ_TASK {
    id: number;
    task: string;
    description: string;
    criteria: string;
    status: string;
    status_name: string;
    category: number;
    category_item: string;
    estimate: number;
    responsible: number;
    responsible_username: string;
    owner: number;
    owner_username: string;
    created_at: string;
    updated_at: string;
}

export interface POST_TASK {
    id: number;
    task: string;
    description: string;
    criteria: string;
    status: string;
    category: number;
    estimate: number;
    responsible: number;
}

export interface CATEGORY {
    id: number;
    item: string;
}

export interface TASK_STATE {
    tasks: READ_TASK[];
    editedTask: POST_TASK;
    selectedTask: READ_TASK;
    users: USER[];
    category: CATEGORY[];
}

/*TaskList.tsx*/
export interface SORT_STATE {
    rows: READ_TASK[];
    order: "desc" | "asc";
    activeKey: string;
}