<template>
  <div class="login">
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="login-title">三一智矿IoT</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" size="large" type="text" auto-complete="off" placeholder="账号">
          <template #prefix>
            <i icon-class="user" class="el-input__icon input-icon" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" size="large" show-password @keyup.enter="handleLogin">
          <template #prefix>
            <i icon-class="password" class="el-input__icon input-icon" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button :loading="loading" type="primary" style="width: 100%" @click.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const state = reactive({
      loading: false,
      loginForm: {
        username: 'user',
        password: '123456'
      },
      // 表单规则验证
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
        password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }]
      }
    })

    const loginFormRef = ref(null)
    /**
     * 获取store
     */
    const store = useStore()
    /**
     * 当前路由实例
     */
    const router = useRouter()

    const handleLogin = () => {
      loginFormRef.value.validate(valid => {
        if (valid) {
          state.loading = true
          // 调用action的登录方法
          store
            .dispatch('user/login', state.loginForm)
            .then(res => {
              console.log(res)
              router.push({ path: '/' })
            })
            .catch(() => {
              state.loading = false
            })
        }
      })
    }

    return {
      loginFormRef,
      ...toRefs(state),
      handleLogin
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  &-title {
    color: #000;
    font-size: 4rem;
  }
}
.login-form {
  border-radius: 6px;
  background: #e2dfdf7c;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
</style>
