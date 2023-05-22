import AuthForm from "./components/AuthForm";

const Auth = () => {
  return (
    <div 
      className="
        flex
        flex-col 
        justify-center 
        py-12 
        sm:px-6 
        lg:px-8 
        bg-gray-100
        min-h-full
      "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 
          className="
            mt-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-gray-900
          "
          >
            Sign in to your account
        </h2>
      </div>
      <AuthForm />      
  </div>
  )
}

export default Auth;
