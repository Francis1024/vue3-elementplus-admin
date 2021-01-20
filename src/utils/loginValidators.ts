import { ref } from "vue";

interface User {
    email: string;
    password: string;
}

export const loginUser = ref<User>({
    email: "admin@ztyuu.com",
    password: "123456",
});

interface Rules {
    email: ({
        type: string;
        message: string;
        required: boolean;
        trigger: string;
    } | {
        validator: (rule: Rules, value: string, callback: any) => void;
        trigger: string;
    })[];
    password: ({
        required: boolean;
        message: string;
        trigger: string;
        min?: undefined;
        max?: undefined;
    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;
        required?: undefined;
    })[];
}

// 自定义规则检测
const validateEmail = (rule: Rules, value: string, callback: any) => {
    if (value !== 'admin@ztyuu.com') {
        callback(new Error('请输入：admin@ztyuu.com'));
    } else {
        callback();
    }
};

// 校验规则
export const rules = ref<Rules>({
    email: [
        {
            type: "email",
            message: "邮箱地址不正确...",
            required: true,
            trigger: "blur",
        },
        { validator: validateEmail, trigger: 'blur' },
    ],
    password: [
        {
            required: true,
            message: "密码不能为空...",
            trigger: "blur",
        },
        {
            min: 6,
            max: 30,
            message: "密码长度为6 ~ 30个字符...",
            trigger: "blur",
        },
    ],
});