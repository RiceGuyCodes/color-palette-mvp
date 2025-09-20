import ClientOnly from '../../components/ClientOnly'
import LoginForm from '../../components/LoginForm'

export default function LoginPage() {
  return (
    <ClientOnly>
      <LoginForm />
    </ClientOnly>
  )
}
