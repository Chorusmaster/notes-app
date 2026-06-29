import { useState } from 'react';

function RegistrationPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [action, setAction] = useState<"login" | "register">("login");

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
  }

  return (
    <form className='flex-1 flex justify-center items-center'>
      <div className='w-86 xl:w-[min(24%,32rem)] border-2 border-primary rounded-xl p-8 flex flex-col'>
        <h2 className='text-center text-2xl text-primary font-medium mb-4'>{ action == "login" ? "Log in" : "Register" }</h2>

        <label htmlFor="email">E-mail</label>
        <input 
          name="email" 
          id="email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="
            border border-border rounded-lg 
            mt-1 mb-2 h-8 p-2 
            focus:outline-none focus:ring-1 focus:ring-primary/40
        ">
        </input>

        {action == "register" &&
          (<>
            <label htmlFor="password">Password</label>
            <input 
              name="password" 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="
                border border-border rounded-lg 
                mt-1 h-8 p-2 
                focus:outline-none focus:ring-1 focus:ring-primary/40
            ">
            </input>
          </>)
        }

        <label htmlFor="password" className='mt-2'>Password confirm</label>
        <input 
          name="confirm" 
          id="confirm" 
          type="confirm" 
          value={confirmedPassword} 
          onChange={(e) => setConfirmedPassword(e.target.value)}
          className="
            border border-border rounded-lg 
            mt-1 h-8 p-2 
            focus:outline-none focus:ring-1 focus:ring-primary/40
        ">
        </input>

        <a 
          onClick={() => setAction(action === "login" ? "register" : "login")}
          className='
            text-secondary hover:text-secondary-hover 
            cursor-pointer underline 
            mt-2 mb-4'
        >
          {action === "login" ? "Don't have an account yet? Register" : "Already have an account? Log in"}
        </a>

        <div className='flex justify-end'>
          <button 
            onClick={(e) => handleSubmit(e)}
            type="submit" 
            className="
              rounded-lg 
              bg-secondary hover:bg-secondary-hover transition 
              text-on-primary 
              w-20 h-8
              active:scale-98 cursor-pointer
            "
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default RegistrationPanel;