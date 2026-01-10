export interface IGenericResult<T> {
    meta: {
        count?: number;
        take?: number;
        page?: number;
        totalPage?: number;
    };
    data: T;
}
