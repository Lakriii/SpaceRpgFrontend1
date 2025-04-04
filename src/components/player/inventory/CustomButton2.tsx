const CustomButton2 = ({ isEquipped, onToggle }: CustomButton2Props) => {
  return (
    <button
      className={`mt-4 px-6 py-2 rounded-full text-white font-bold tracking-wider
                  transition-all duration-300 neon-button 
                  ${isEquipped ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
      onClick={onToggle}
    >
      {isEquipped ? "UNEQUIP" : "EQUIP"}
    </button>
  );
};

export default CustomButton2;
