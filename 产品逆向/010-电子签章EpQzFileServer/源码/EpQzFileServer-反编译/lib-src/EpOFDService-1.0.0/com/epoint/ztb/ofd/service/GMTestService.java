/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.ofd.service;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintStream;
import java.net.ServerSocket;
import java.net.Socket;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags={"GMTestService"}, description="GMTestService")
@RestController
@RequestMapping(value={"/gm/v1"})
public class GMTestService {
    private static final Logger log = LoggerFactory.getLogger(GMTestService.class);

    @ApiOperation(value="\u6d4b\u8bd5\u63a5\u53e3")
    @PostMapping(value={"/test"})
    public String Test(@RequestBody String text) throws IOException {
        log.info("\u6536\u5230\u7684\u4fe1\u606f" + text);
        return text;
    }

    private static String sendtcp(Socket client, String str) throws IOException {
        OutputStream outputStream = client.getOutputStream();
        PrintStream socketPrintStream = new PrintStream(outputStream);
        InputStream inputStream = client.getInputStream();
        BufferedReader socketBufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        socketPrintStream.println(str);
        String echo = socketBufferedReader.readLine();
        socketPrintStream.close();
        socketBufferedReader.close();
        return echo;
    }

    private static void startTCPServer() throws IOException {
        ServerSocket server = new ServerSocket(2000);
        log.info("\u670d\u52a1\u5668\u51c6\u5907\u5c31\u7eea\uff5e");
        log.info("\u670d\u52a1\u5668\u4fe1\u606f\uff1a" + server.getInetAddress() + " P:" + server.getLocalPort());
        while (true) {
            Socket client = server.accept();
            ClientHandler clientHandler = new ClientHandler(client);
            clientHandler.start();
        }
    }

    public static void main(String[] args) throws IOException {
        GMTestService.startTCPServer();
    }

    private static class ClientHandler
    extends Thread {
        private Socket socket;
        private boolean flag = true;

        ClientHandler(Socket socket) {
            this.socket = socket;
        }

        /*
         * WARNING - Removed try catching itself - possible behaviour change.
         */
        @Override
        public void run() {
            super.run();
            log.info("\u65b0\u5ba2\u6237\u7aef\u8fde\u63a5\uff1a" + this.socket.getInetAddress() + " P:" + this.socket.getPort());
            try {
                PrintStream socketOutput = new PrintStream(this.socket.getOutputStream());
                BufferedReader socketInput = new BufferedReader(new InputStreamReader(this.socket.getInputStream()));
                do {
                    String str = socketInput.readLine();
                    log.info("\u6536\u5230\u6d88\u606f\uff1a" + str);
                    socketOutput.println("\u56de\u9001\uff1a" + str);
                } while (this.flag);
                socketInput.close();
                socketOutput.close();
            }
            catch (Exception e) {
                System.out.println("\u8fde\u63a5\u5f02\u5e38\u65ad\u5f00");
            }
            finally {
                try {
                    this.socket.close();
                }
                catch (IOException e) {
                    e.printStackTrace();
                }
            }
            log.info("\u5ba2\u6237\u7aef\u5df2\u9000\u51fa\uff1a" + this.socket.getInetAddress() + " P:" + this.socket.getPort());
        }
    }
}

