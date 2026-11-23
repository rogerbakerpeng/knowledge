/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.ztb.logback;

import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.filter.Filter;
import ch.qos.logback.core.spi.FilterReply;

public class KanbanFilter
extends Filter<ILoggingEvent> {
    @Override
    public FilterReply decide(ILoggingEvent event) {
        if (event.getFormattedMessage().contains("apidescription")) {
            return FilterReply.ACCEPT;
        }
        return FilterReply.DENY;
    }
}

