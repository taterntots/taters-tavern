/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux';
import {
  requestGame,
  gameSelector
} from '../../../features/game/gameSlice';

// FORMS
import { useForm } from "react-hook-form";

// IMAGES
import LoadSpinner from '../../LoadSpinner';

// ----------------------------------------------------------------------------------
// ------------------------==------ REQUEST GAME MODAL ------------------------------
// ----------------------------------------------------------------------------------

const RequestGameModal = ({ open, setOpen, refresh, setRefresh }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { loading } = useSelector(gameSelector);
  const cancelButtonRef = useRef(null)

  // Function to handle submitting game request
  const submitGameRequest = async (data) => {
    dispatch(requestGame(data))
      .then(res => {
        if (res.payload) {
          setRefresh(!refresh)
          setOpen(false)
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-full mx-6 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form className="p-10 bg-taterpurple text-white" onSubmit={handleSubmit(submitGameRequest)}>
                <h4 className='text-2xl mb-4'>
                  Request Game
                </h4>

                <div className="mt-7 form-group">
                  <label className='mr-3'>Game Name<span className='text-red-500'>*</span></label>
                  {errors.name && (
                    <span className='text-red-500'>{errors.name.message}</span>)}
                  <input
                    name='name'
                    type='text'
                    placeholder='Name of the game'
                    className='form-control text-black w-full flex items-center mb-7 mt-3 p-2 rounded-md text-lg'
                    {...register('name', {
                      required: 'Required field',
                    }
                    )}
                  />
                </div>

                <div className='flex justify-evenly'>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      reset()
                    }}
                    className={`flex items-center rounded-lg text-lg px-12 md:px-12 py-3 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={loading ? 'opacity-80 pointer-events-none flex items-center rounded-lg text-lg px-12 md:px-12 py-3 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out' :
                      'flex items-center rounded-lg text-lg px-12 md:px-12 py-3 text-center font-medium bg-purplebutton hover:bg-white hover:text-purplebutton focus:ring transition duration-150 ease-in-out'
                    }
                  >
                    {loading ? (
                      <div className='h-7 mr-6'>
                        <LoadSpinner />
                      </div>
                    ) : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default RequestGameModal;