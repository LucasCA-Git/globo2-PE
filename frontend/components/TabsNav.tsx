const tabs = ["Visão Geral", "Ilhas", "Analytics", "Histórico"];

type Props = {
  active: number;
  onChange: (index: number) => void;
};

export default function TabsNav({ active, onChange }: Props) {
  return (
    <nav className="flex flex-wrap gap-2">
      {tabs.map((tab, index) => {
        const isActive = active === index;

        return (
          <button
            key={tab}
            onClick={() => onChange(index)}
            className={`
              rounded-lg px-4 py-2 text-sm font-medium transition border

              ${isActive
                ? `
                    bg-[rgba(49,77,117,1)] 
                    text-[rgba(227,227,233,1)] 
                    border-transparent
                  `
                : `
                    border-[rgba(0,0,0,0.1)] dark:border-white/10
                    bg-[rgba(255,255,255,1)] dark:bg-[rgba(37,37,37,1)]
                    text-[rgba(30,30,30,1)] dark:text-[rgba(200,200,210,1)]
                    hover:bg-[rgba(235,235,235,1)] 
                    dark:hover:bg-[rgba(50,50,50,1)]
                  `
              }
            `}
          >
            {tab}
          </button>
        );
      })}
    </nav>
  );
}