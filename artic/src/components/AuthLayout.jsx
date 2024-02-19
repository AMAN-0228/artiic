import React from 'react'
import { useSelector } from 'react-redux'
import Container from './container/Container'
import NoDataTag from './NoDataTag'

const AuthLayout = ({children, authStatus}) => {
    const authentication = useSelector(state => state.auth.status)
    if(authStatus && authentication === true){
        return (
            <div className='W-full'>
                <Container>
                {children}
                </Container>
            </div>
        )
    }
    else if(!authStatus &&  !(authentication === true)){
        return (
            <div className='w-full'>
                {children}
            </div>
        )
    }
  return (
    <NoDataTag>
    <div className='text-center py-10 mt-3 font-medium'>
      Please Login to see more
    </div>
    </NoDataTag>
  )
}

export default AuthLayout
