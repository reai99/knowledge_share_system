import Mock from 'mockjs';
import { createToken } from '@/utils/validate'

const UserLogin = (req: any) => {
    const { code, token } = createToken(req.username, req.password)
    console.log(code, Mock.Random)
    return {
        ok: true,
        code: 200,
        msg: '登录成功',
        data: {
            token: token
        },
        runtime: new Date().getTime()
    }
}
Mock.setup({
    timeout: 2000
})

export const login = Mock.mock('/api/login', 'post', UserLogin)
export const register = Mock.mock('/api/register', 'post', (req: any) => {
    return {
        ok: true,
        code: 200,
        msg: '注册成功',
        runtime: new Date().getTime()
    }
})


