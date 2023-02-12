import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from '@modules/auth/auth.service';
import { LoginDto } from '@modules/auth/dto/login.dto';
import { RegisterDto } from '@modules/auth/dto/register.dto';
import { JwtAuthGuard } from '@shared/guards/auth.guard';
import { ApiAuthDescription } from '@modules/auth/constants/description-api';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { UpdateProfileDto } from '@upload/auth/dto/updateProfile.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('AuthController');
  }

  @Post('register')
  @ApiOperation({ description: ApiAuthDescription.register })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ description: ApiAuthDescription.login })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Post('logout')
  @ApiOperation({ description: ApiAuthDescription.logout })
  logout() {
    return {
      message: 'success',
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Post('update-profile')
  @ApiOperation({ description: ApiAuthDescription.update })
  updateProfile(@Req() req, @Body() data: UpdateProfileDto) {
    console.log(req.user.id, data);
    return this.authService.updateProfile(req.user.id, data);
  }
}
