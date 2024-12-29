import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { Role } from "../../common/enum/rol.enum";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";

export function Auth( role: Role){
    
    return applyDecorators(
        Roles(Role.ADMIN),
        UseGuards(AuthGuard,RolesGuard)
    );
}