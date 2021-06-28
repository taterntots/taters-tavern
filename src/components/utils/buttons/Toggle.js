import React from 'react';

// STYLING
import styled from '@emotion/styled';

// ----------------------------------------------------------------------------------
// ------------------------------------ TOGGLE --------------------------------------
// ----------------------------------------------------------------------------------

const Toggle = ({ on, setOn, submitFunction, userColorOne }) => {
  const ProfileOneSpan = styled.span`
    background-color: ${on && userColorOne ? userColorOne : null};
  `

  return (
    <ProfileOneSpan
      onClick={() => {
        setOn(!on);
        if (on) {
          submitFunction({ featured: false, completed: false })
        }
        if (!on) {
          submitFunction({ featured: true, completed: true })
        }
      }}
      role='checkbox'
      tabIndex='0'
      aria-checked='false'
      className={`${on ? 'bg-profileone' : 'bg-gray-300'
        } relative ml-3 inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline`}
    >
      <span
        aria-hidden='true'
        className={`${on ? 'translate-x-5' : 'translate-x-0'
          } translate-x-0 relative inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200`}
      >
        <span
          className={`${on
            ? 'opacity-0 ease-out duration-100'
            : 'opacity-100 ease-in duration-200'
            } opacity-100 ease-in duration-200 absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
        ></span>
        <span
          className={`${on
            ? 'opacity-100 ease-in duration-200'
            : 'opacity-0 ease-out duration-100'
            } opacity-0 ease-out duration-100 absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
        >
          <svg
            className='w-3 h-3 text-graybutton'
            fill='currentColor'
            viewBox='0 0 12 12'
          >
            <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
          </svg>
        </span>
      </span>
    </ProfileOneSpan>
  )
}

export default Toggle;