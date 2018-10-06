import { Pipe } from "@angular/core";

@Pipe({
  name: "hashtag"
})
export class HashtagPipe {
  transform(
    value: string,
  ): string {
    let append = "";
    if (value) {
      append = '#'+value;
    }
    return append;
  }
}
