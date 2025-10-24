import Card from './card';
import { dynamicCss } from '@repo/util';

export interface IDescriptionColumn<T = Record<string, string | number>>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  title: string;
  dataIndex: keyof T;
  col?: number;
  row?: number;
  align?: 'start' | 'center' | 'end';
  style?: ((value: any) => React.CSSProperties) | React.CSSProperties;
  render?: (value: any) => React.ReactNode;
  isEdit?: boolean;
  isCheckbox?: boolean;
}

interface IDescription {
  className?: string;
  title?: string;
  column?: number;
  columns?: IDescriptionColumn[];
  data: Record<string, string | number>;
  children?: React.ReactNode;
}

const Descriptions = (props: IDescription) => {
  const { className = '', title, column = 1, columns = [], data, children } = props;

  function getAlign(align: IDescriptionColumn['align']) {
    switch (align) {
      case 'start':
        return 'text-start';
      case 'center':
        return 'text-start';
      case 'end':
        return 'text-end';
    }
  }

  function formatter(value: number | string | boolean) {
    switch (typeof value) {
      case 'string':
        return value.replace(/(?:\r\n|\r|\n)/g, '\r\n');
      case 'boolean':
        return value.toString();
      case 'number':
      default:
        return value;
    }
  }

  return (
    <Card className={className} title={title}>
      <div
        className="grid grid-cols-[--dynamic-description-grid-cols] gap-[6px] auto-rows-[minmax(20px,auto)]"
        style={dynamicCss('description', {
          'grid-cols': `repeat(${column}, minmax(0, 1fr))`,
        })}
      >
        {columns
          .filter((col) => !col.title.includes('내지'))
          .map((colItem) => {
            const {
              title,
              dataIndex,
              col = 1,
              row = 1,
              align = 'start',
              style,
              render = formatter,
              isCheckbox = false,
            } = colItem;

            const value = data?.[dataIndex] ?? '';

            const styleInfo = typeof style === 'function' ? style(value) : style;

            return (
              <div
                key={title}
                className="flex gap-3 items-center col-[--dynamic-description-col-span] row-[--dynamic-description-row-span]"
                style={dynamicCss('description', {
                  'col-span': `span ${Math.min(col, column)} / span ${Math.min(col, column)}`,
                  'row-span': `span ${row} / span ${row}`,
                  'max-height': `${row * 24}px`,
                })}
              >
                <span className="shrink-0 text-right" style={{ width: 'clamp(70px, 100%, 94px)' }}>
                  {title}
                </span>
                <div
                  title={value.toString()}
                  className={`w-full h-full min-h-5 min-w-5 max-h-[--dynamic-description-max-height] leading-[14px] whitespace-pre-wrap overflow-auto p-[2px] ${isCheckbox ? '' : `rounded-sm border border-[#7676764d] bg-[#efefef4d] ${getAlign(align)}`}`}
                  style={styleInfo}
                >
                  {isCheckbox ? (
                    <div className="flex items-center h-full">
                      <input
                        type="checkbox"
                        checked={value === 'Y'}
                        className="-mt-[2px]"
                        readOnly
                      />
                    </div>
                  ) : (
                    render(value)
                  )}
                </div>
              </div>
            );
          })}
        {children}
      </div>
    </Card>
  );
};

export default Descriptions;
