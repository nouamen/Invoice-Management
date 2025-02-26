import Navbar from "./Navbar"

type WrapperProps = {
    children : React.ReactNode
}
const Wrapper = ({children}:WrapperProps) => {
  return (
    <div>
      <Navbar />
      <div className="px-5 md:px-[9%] mt-4 mb-10">
        {children}
      </div>
    </div>
  )
}

export default Wrapper