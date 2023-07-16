export interface ILoginResponse {
    user: unknown
    accessToken: string
    changePassword: boolean
    refreshToken: string
    isPermanent: boolean
}