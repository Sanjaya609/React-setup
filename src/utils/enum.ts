export enum RequestMethod {
    GET = 'GET',
    DELETE = 'DELETE',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    PURGE = 'PURGE',
    LINK = 'LINK',
    UNLINK = 'UNLINK'
}

export enum RequestBodyType {
    /* If request id in application/x-www-form-urlencoded as string */
    QUERY_STRING = 'QUERY-STRING',
    /* If request is in formdata */
    FORM_DATA = 'FORM-DATA',
    /* If request requires Bearer */
    AUTH = 'AUTH',
    /* If request is open */
    NO_AUTH = 'NO-AUTH',
    FILE = 'FILE',
}