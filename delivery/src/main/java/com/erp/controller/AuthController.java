package com.erp.controller;

import com.erp.config.JwtRequest;
import com.erp.config.JwtResponse;
import com.erp.config.JwtTokenUtil;
import com.erp.dao.SysRoleDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.erp.model.UserModel;
import com.erp.model.dto.RolePermissionDTO;
import com.erp.service.UserService;
import com.erp.util.ResponseUtil;
import com.erp.util.VfData;
import java.util.List;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private SysRoleDAO sysRoleDAO;
    
    @Autowired
    private VfData vfData;

    @RequestMapping(value = "/auth/token", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
            final UserModel userDetails = userService.findUser(authenticationRequest.getUsername());
            final List<RolePermissionDTO> lstScope = sysRoleDAO.getListPermission(vfData, userDetails.getUsername());
            final String token = jwtTokenUtil.generateToken(userDetails);
            return ResponseEntity.ok(new JwtResponse(token, userDetails.getUsername(), userDetails.getFirstname(), userDetails.getLastname(), lstScope));
        }catch (DisabledException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tài khoản mật khẩu không chính xác!");
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tài khoản mật khẩu không chính xác!");
        }
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public ResponseEntity<ResponseUtil<UserModel>> signup(@RequestBody UserModel user) {
        ResponseUtil<UserModel> result = new ResponseUtil<UserModel>();
        UserModel data = new UserModel();
        data = this.userService.findUser(user.getUsername());
        if (data == null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            data = userService.save(user);
            if (data != null) {
                result.setObject(data);
                result.setError(false);
                return new ResponseEntity<>(result, HttpStatus.OK);
            }
            result.setMessage("Không lưu được, đăng ký thật bại!");
            result.setError(true);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        result.setMessage("Đã tồn tại người dùng!");
        result.setError(true);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
