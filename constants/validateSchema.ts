import * as z from 'zod';

export const loginPhoneSchema = z.object({
  phoneNumber: z.string().min(1, { message: '请输入手机号码' }).max(15),
  password: z.string().min(1, { message: '请输入登陆密码' }).max(16),
});

export const registerPhoneSchema = z
  .object({
    phoneNumber: z.string().min(1, { message: '账号：账号由6-15位数字加字母组成' }).max(15),
    password: z.string().min(1, { message: '由8-16位数字加字母组成' }).max(16),
    confirmPassword: z.string().min(1, { message: '由8-16位数字加字母组成' }).max(16),
    verifyCode: z.string().min(1, { message: '请输入短信验证码' }).max(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '密码应该匹配',
    path: ['confirmPassword'],
  });
