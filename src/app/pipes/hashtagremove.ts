import { Pipe } from "@angular/core";

@Pipe({
  name: "hashtagremove"
})
export class HashtagRemovePipe {
  transform(
    value: string,
  ): string {
    let append = "";
    if (value) {
      append = value.replace('#','');
    }
    return append;
  }
}
