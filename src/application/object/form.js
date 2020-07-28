import is from 'is_js';
import CoreObject from './core';

class Schema extends CoreObject {
  constructor() {
    super();
    // 基础属性
    this.title = '';          // 标题
    this.type = 'object';     // 类型
    this.properties = {};     // 属性
    this.required = [];       // 必填属性
  }

  // 数据映射
  static datamap() {
    return {
      // 基础属性
      title: 'title',
      type: 'type',
      properties: 'properties',
      required: 'required',
    };
  }

  // 反向映射
  static revertMap() {
    return {
      title: 'title',
      type: 'type',
      properties: 'properties',
      required: 'required',
    };
  }
}

// 字段的schema映射（字段结构）
class DynamicFieldSchema extends CoreObject {
  constructor() {
    super();

    // 基础属性
    this.id = `field-${Math.random()}-${new Date().getTime()}`;  // 控件id
    this.field = '';          // 控件字段名称
    this.title = '';          // 控件标题
    this.type = '';           // 控件类型
    this.value = undefined;   // 控件值
    this.options = [];        // 控件选项
    this.required = false;    // 是否必填

    // 控件特殊属性（string）
    this.minLength = 0;         // 最小长度
    this.maxLength = Infinity;  // 最大长度
    this.format = undefined;    // 字段格式
    this.pattern = undefined;   // 正则匹配格式

    // 控件特殊属性（number）
    this.minimum = -Infinity;   // 最大值（小于等于）
    this.maximum = Infinity;    // 最小值（大于等于）

    // 空间特殊属性（images）
    this.images = [];               // 图片列表key
    this.imagesURL = [];            // 图片列表url

    // 界面属性
    this.sort = -1;                 // 字段排序，默认从0开始。-1为不排序
    this.isInner = false;           // 是否内置
    this.disabled = false;          // 是否禁用
    this.readOnly = false;          // 是否只读
    this.isDetail = false;          // 是否详情
    this.onlyShowDetail = false;    // 是否只显示在详情中
    this.placeholder = undefined;   // 占位描述
    this.defaultValue = undefined;  // 默认值

    // 本地扩展
    this.widget = undefined;    // 组件对象
  }

  // 数据映射
  static datamap() {
    return {
      id: 'id',
      field: 'field',
      title: 'title',
      value: 'value',
      required: 'required',
      type: {
        key: 'type',
        transform: (type, schema) => {
          if (!type && schema.const) {
            if (Array.isArray(type)) {
              return 'array';
            }
            if (typeof type === 'string') {
              return 'string';
            }
            if (type == null) {
              return 'null';
            }
            if (typeof type === 'boolean') {
              return 'boolean';
            }
            if (!Number.isNaN(type)) {
              return 'number';
            }
            if (typeof type === 'object') {
              return 'object';
            }
            // Default to string if we can't figure it out
            return 'string';
          }

          if (!type && schema.enum) {
            return 'string';
          }

          if (type instanceof Array && type.length === 2 && type.includes('null')) {
            return type.find(item => item !== 'null');
          }

          return type;
        },
      },

      minLength: 'minLength',
      maxLength: 'maxLength',
      format: 'format',
      pattern: 'pattern',

      minimum: 'minimum',
      maximum: 'maximum',
      images: 'images',
      images_url_list: 'imagesURL',
      'ui.options': {
        key: 'options',
        transform: (value, record) => {
          // 判断设定值是否存在
          if (is.existy(value) && is.not.empty(value) && is.array(value)) {
            return value;
          }

          // 判断枚举值是否存在
          if (is.existy(record.enum) && is.not.empty(record.enum) && is.array(record.enum)) {
            return record.enum;
          }

          // 默认返回空
          return [];
        },
      },
      'ui.sort': 'sort',
      'ui.isInner': 'isInner',
      'ui.disabled': 'disabled',
      'ui.readOnly': 'readOnly',
      'ui.isDetail': 'isDetail',
      'ui.onlyShowDetail': 'onlyShowDetail',
      'ui.placeholder': 'placeholder',
      'ui.defaultValue': 'defaultValue',
      'ui.widget': 'widget',
    };
  }

  // 反向映射
  static revertMap() {
    return {
      id: 'id',
      title: 'title',
      type: 'type',

      minLength: 'minLength',
      maxLength: 'maxLength',
      format: 'format',
      pattern: 'pattern',

      minimum: 'minimum',
      maximum: 'maximum',

      options: 'ui.options',
      sort: 'ui.sort',
      isInner: 'ui.isInner',
      disabled: 'ui.disabled',
      readOnly: 'ui.readOnly',
      isDetail: 'ui.isDetail',
      onlyShowDetail: 'ui.onlyShowDetail',
      placeholder: 'ui.placeholder',
      defaultValue: 'ui.defaultValue',
      widget: 'ui.widget',
    };
  }
}

// 表单的schema映射（表单结构）
class DynamicFormSchema extends CoreObject {
  constructor() {
    super();
    this.required = undefined;   // 必填字段
    this.fields = undefined;     // 表单控件字段
  }

  // 数据映射
  static datamap() {
    return {
      fields: {
        key: 'fields',
        transform: (value) => {
          // console.log(value);

          // 转换表单字段对象
          const schema = Schema.mapper(value, Schema);
          // 遍历字段
          const fields = Object.keys(schema.properties).map((key) => {
            const property = schema.properties[key];
            // 字段名称
            property.field = key;
            // 判断是否必填字段
            property.required = schema.required.includes(key);

            // 解析字段
            const field = DynamicFieldSchema.mapper(property, DynamicFieldSchema);
            // console.log(field);
            return field;
          });

          // 数据字段排序
          const result = fields.sort((a, b) => a.sort - b.sort);
          return result;
        },
      },
      'fields.required': 'required',
    };
  }

  // 反向映射
  static revertMap() {
    return {
      fields: {
        key: 'fields',
        transform: (fields) => {
          // 遍历所有的属性，所有的属性反向映射字段
          const properties = {};
          fields.forEach((field) => {
            properties[field.field] = DynamicFieldSchema.revert(field, DynamicFieldSchema);
          });

          return {
            title: '表单对象',
            type: 'object',
            properties,
          };
        },
      },
      required: 'fields.required',
    };
  }
}

export {
  DynamicFormSchema,
  DynamicFieldSchema,
};
