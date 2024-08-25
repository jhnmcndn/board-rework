import * as z from 'zod';

export const loginPhoneSchema = z.object({
  phoneNumber: z.string().min(1, { message: '请输入手机号码' }).max(15),
  password: z.string().min(1, { message: '请输入登陆密码' }).max(16),
});

export const registerPhoneSchema = z.object({});
