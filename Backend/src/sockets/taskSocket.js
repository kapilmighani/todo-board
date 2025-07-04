// src/sockets/taskSocket.js

const taskSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Task create event
    socket.on('createTask', (taskData) => {
      console.log('New task created:', taskData);
      // Broadcast to all other clients
      socket.broadcast.emit('taskCreated', taskData);
    });

    // Task update event (for drag-drop or edit)
    socket.on('updateTask', (updatedTask) => {
      console.log('Task updated:', updatedTask);
      socket.broadcast.emit('taskUpdated', updatedTask);
    });

    // Task delete
    socket.on('deleteTask', (taskId) => {
      console.log('Task deleted:', taskId);
      socket.broadcast.emit('taskDeleted', taskId);
    });

    // On disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

export default taskSocket;
