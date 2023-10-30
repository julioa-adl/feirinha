export interface ApiResponse {
    status: number
    data: {
        message: boolean,
        name?: string,
        token?: string
    }
    response: {
        message: boolean,
        data: {
            message: boolean
        }
    }
}