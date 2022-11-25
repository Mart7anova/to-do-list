import {AxiosError} from "axios";

export type ServerNetworkError = Error | AxiosError<{ error: string }>