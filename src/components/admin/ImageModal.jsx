export default function ImageModal({ imageUrl, onClose, onDelete }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[100] p-4">
      <div className="bg-[#282c33] p-4 rounded-lg max-w-lg w-full border border-gray-600">
        <img src={imageUrl} className="w-full h-auto rounded mb-4" alt="View" />
        <div className="flex gap-2">
          <button onClick={onDelete} className="bg-red-600 px-4 py-2 rounded font-bold w-full">Delete Image</button>
          <button onClick={onClose} className="bg-gray-600 px-4 py-2 rounded font-bold w-full">Close</button>
        </div>
      </div>
    </div>
  );
}