import crypto from 'crypto';

const SECRET = 'SHENx-REST-API';

export const hash = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}