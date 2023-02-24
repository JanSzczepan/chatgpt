type ChatProps = {
   id: string
}

function Chat({ id }: ChatProps) {
   return <div className='flex-1'>Chat {id}</div>
}

export default Chat
