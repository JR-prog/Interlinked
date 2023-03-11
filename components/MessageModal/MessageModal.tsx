'use client';
import { FaRegCommentDots, FaCommentDots } from 'react-icons/fa';
import { Disclosure } from '@headlessui/react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import CreateChatModal from '@/components/DM/CreateChatModal';

export default function MessageModal({ userUID }: { userUID: string }) {
  const [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className=" flex items-center">
        <button
          type="button"
          onClick={openModal}
          className="flex inline-flex items-center gap-2 rounded-lg bg-yellow-600 px-5 py-2.5 text-center text-sm font-bold text-purple-background transition-all hover:bg-yellow-500 focus:outline-none "
        >
          {isOpen ? <FaCommentDots /> : <FaRegCommentDots />}
          Message
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-purple-component p-5 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title></Dialog.Title>

                  <CreateChatModal userUID={userUID} />

                  {/* <div className="mt-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
