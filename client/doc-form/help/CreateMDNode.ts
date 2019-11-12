export default class CreateMDNode {
  protected createList = (itemText: string) => {
    const text = [itemText];
    return {
      type: 'list',
      body: [
        {
          type: 'listitem',
          text
        }
      ],
      ordered: true
    };
  }

  protected createHeader = (level: number, headerText: string) => {
    const text = [headerText];
    return {
      type: 'heading',
      text,
      level,
      raw: headerText
    };
  }

  protected createTable = (headerList: string[], bodyList: string[][], suffixArr: string[] = []) => {
    return {
      type: 'table',
      header: [this.createTableRow(headerList)],
      body: bodyList.map((value) => {
        return this.createTableRow([...value, ...suffixArr]);
      })
    };
  }

  private createTableRow = (rowList: string[]) => {
    const content = rowList.map((value) => {
      return {
        type: 'tablecell',
        content: [value],
        flags: {
          header: true,
          align: null
        }
      };
    });
    return {
      type: 'tablerow',
      content
    };
  }

  protected createCode = (lang: string, code: string) => {
    return {
      code,
      escaped: undefined,
      fenced: true,
      lang,
      type: 'code'
    };
  }
}