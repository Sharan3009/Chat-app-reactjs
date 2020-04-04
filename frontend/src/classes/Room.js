class Room {
    constructor(roomName,ownerId,ownerName,joinees,editable=false,roomId){
        this.roomName = roomName;
        this.ownerId = ownerId;
        this.ownerName = ownerName;
        this.joinees = joinees;
        this.capacity = 50;
        this.editable = editable;
        if(roomId){
            this.roomId = roomId;
        }
    }
}

export default Room;