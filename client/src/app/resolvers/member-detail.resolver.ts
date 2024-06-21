// import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
// import { Member } from "../models/member";
// import { Injectable } from "@angular/core";
// import { MembersService } from "../services/members.service";
// import { Observable, of } from "rxjs";

// @Injectable({
//     providedIn: 'root'
// })
// export class MemberDetailResolver implements Resolve<Member | null> {
//     constructor(private memberService: MembersService) { }
//     resolve(route: ActivatedRouteSnapshot): Observable<Member | null> {
//         const username = route.paramMap.get('username');
//         if (username !== null) {
//             return this.memberService.getMember(username);
//         }

//         return of(null);
//     }
// }